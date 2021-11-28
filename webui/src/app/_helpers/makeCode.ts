export function randomCode(length: number) {
    var result = '';
    var char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
    }

    return result;
}