export default function headerCss() {
    return `.header {
    position: fixed;
    width: 100%;
    height: var(--header);
    padding-inline: var(--page-padding);
    display: flex;
    align-items: center;
    gap: var(--f-spacing-sml);
    background-color: var(--f-clr-fg-100);
    border-bottom: solid 1px var(--f-clr-fg-200);
    z-index: 100;
}

@media (max-width: 768px) {
    .navigation {
        display: none !important;
    }

    .account {
        display: none !important;
    }
}`;
}