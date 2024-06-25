import { createPlugin, CurrentPlugin } from "@extism/extism";

async function runPlugin(wasmUrl: string, functionName: string, ...args: any[]) {
    const plugin = await createPlugin(
        await (await fetch(wasmUrl)).arrayBuffer(),
        { useWasi: true, enableWasiOutput: true }
    );

    await plugin.call(functionName, ...args);
}

const WASIExamples = {
    countVowels: () => runPlugin('./wasi/count_vowels/count_vowels.wasm', 'count_vowels', 'Hello, World!'),
    helloWorldRust: () => runPlugin('./wasi/wasi_hello_world_rust/target/wasm32-wasi/debug/wasi_hello_world.wasm', '__main_void'),
    helloWorldCWithEmscripten: () => runPlugin('./wasi/wasi_hello_world_c/output.wasm', 'main'),

    // Doesn't work – needs __syscall_connect
    syncNetworkRequest: () => runPlugin('./wasi/wasi_network_request_c/output.wasm', 'main'),

    // Doesn't work – crash on munmap
    partialMunmap: () => runPlugin('./wasi/wasi_partial_munmap_c/output.wasm', 'main'),

    // An asynchronous host functions work, but only when `runInWorker` is true
    asyncHostFunction: async () => {
        let kvStore = new Map();
        const plugin = await createPlugin(
            await (await fetch('./wasi/count_vowels_kvstore/count_vowels_kvstore.wasm')).arrayBuffer(),
            {
                useWasi: true,
                enableWasiOutput: true,
                runInWorker: true,

                functions: {
                    "extism:host/user": {
                        async kv_read(cp: CurrentPlugin, offs: bigint) {
                            const key = cp.read(offs).text();
                            let value = kvStore.get(key) ?? new Uint8Array([0, 0, 0, 0]);
                            await new Promise(resolve => {
                                setTimeout(resolve, 100000);
                            });
                            console.log(`Read ${new DataView(value.buffer).getUint32(0, true)} from key=${key}`);
                            return cp.store(value);
                        },
                        kv_write(cp: CurrentPlugin, kOffs: bigint, vOffs: bigint) {
                            const key = cp.read(kOffs).text();
            
                            // Value is a PluginOutput, which subclasses DataView. Along
                            // with the `text()` and `json()` methods we've seen, we also
                            // get DataView methods, such as `getUint32`.
                            const value = cp.read(vOffs);
                            console.log(`Writing value=${value.getUint32(0, true)} from key=${key}`);
            
                            kvStore.set(key, value.bytes());
                        }
                    }
                }
            }
        );
        await plugin.call('count_vowels')
    },
};

async function main() {
    let last = Object.keys(WASIExamples).slice(-1);
    for (let example in WASIExamples) {
        if (last.includes(example)) {
            console.group(`Running WASI example: ${example}`);
        } else {
            console.groupCollapsed(`Running WASI example: ${example}`);
        }
        try {
            await WASIExamples[example]();
        } catch (e) {
            console.error(e);
        }
        console.groupEnd();
    }
}

main();
