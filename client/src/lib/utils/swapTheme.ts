export default async function (theme: string, user_id: number) {
    theme = theme == "black" ? "white" : "black" 
        theme == "black" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
        let images: HTMLCollectionOf<HTMLImageElement> = document.getElementsByClassName("nav_icon") as HTMLCollectionOf<HTMLImageElement>;
        if (theme == "black") {
            for (let i = 0; i < images.length; i++) {
                images[i].src = images[i].src.replace(".svg", "_dark.svg");
                images[i].src = images[i].src.replace(".png", "_dark.png");
            }
        } else {
            for (let i = 0; i < images.length; i++) {
                images[i].src = images[i].src.replace("_dark", '');
            }
        }
        // await api.patchProfile(theme);
        await fetch(`http://localhost:18001/profile/${user_id}`, {
            method: "PATCH",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "theme": theme
            })
        });
        
    return theme
} 