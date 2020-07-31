export function convertLinks(elements, router) {
    elements.forEach(e => {
        e.addEventListener("click", ev => {
            ev.preventDefault();
            router.navigate(e.getAttribute("href"));
        });
    });
}