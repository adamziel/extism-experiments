# Build a WASI wasm file with Emscripten
build:
	emcc -O0 -g2 \
		-sENVIRONMENT=web \
		-sEXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
		-sEXPORTED_FUNCTIONS='["_main"]' \
		-sSTANDALONE_WASM=1 \
		-sPURE_WASI=1 \
		-fwasm-exceptions \
		-sSUPPORT_LONGJMP=wasm \
		-sSIDE_MODULE=1 \
		-o output.wasm \
		main.c
