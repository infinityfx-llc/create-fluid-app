export default function gitIgnore() {
    return `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build
fluid.css

# misc
.DS_Store
*.pem
/.vscode/

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env*

# typescript
*.tsbuildinfo
next-env.d.ts`;
}