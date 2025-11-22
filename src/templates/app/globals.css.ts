export default function globalCss() {
    return `:root {
    --header: 4rem;
    --page-width: 80rem;
    --page-padding: max(calc((100vw - var(--page-width)) / 2), var(--f-spacing-med));
}

.page {
    display: flex;
    flex-direction: column;
    padding-top: var(--header);
    padding-inline: var(--page-padding);
    min-height: 100svh;
}`;
}