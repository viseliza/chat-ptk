export async function load(event) {
    const response = await fetch('https://chat-ptk.viseliza.site/api/admin/schedule/1992');
    const buffer = await response.json();
    
    return {
        session: event.locals.session,
        buffer
    }
}