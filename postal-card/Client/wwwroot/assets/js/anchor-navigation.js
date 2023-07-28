// Creator: https://www.meziantou.net/anchor-navigation-in-a-blazor-application.htm
    function BlazorScrollToId(id) {
        const element = document.getElementById(id);
    if (element instanceof HTMLElement) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });
        }
    }