export default async function (theme: string, user_id: number) {
    theme = theme == "black" ? "white" : "black";
    document.cookie=`theme=${theme};path=/; SameSite=None; Secure`;
    
    theme == "black" ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    let images: HTMLCollectionOf<HTMLImageElement> = document.getElementsByClassName("nav_icon") as HTMLCollectionOf<HTMLImageElement>;
    if (theme == "black") {
        for (let i = 0; i < images.length; i++) {
            images[i].src = images[i].src.replace(".svg", "_dark.svg");
        }
    } else {
        for (let i = 0; i < images.length; i++) {
            images[i].src = images[i].src.replace("_dark", '');
        }
    }
    
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