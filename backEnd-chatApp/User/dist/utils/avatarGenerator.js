import gravatar from 'gravatar';
export default function generateAvatar(email) {
    const secureUrl = gravatar.url(email, { s: '128', r: 'g', d: 'retro' });
    return secureUrl;
}
