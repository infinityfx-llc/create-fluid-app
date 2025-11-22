import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

export default {
    input: ['src/index.ts'],
    external: ['tslib', 'prompts'],
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true
    },
    plugins: [
        process.env.NODE_ENV === 'production' ? del({
            targets: 'dist/**'
        }) : undefined,
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        process.env.NODE_ENV === 'production' ? terser({ compress: { directives: false } }) : undefined,
        preserveShebangs()
    ],
    onwarn(msg, handler) {
        if (msg.code === 'THIS_IS_UNDEFINED') return;

        handler(msg);
    }
}