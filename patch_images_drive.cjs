const fs = require('fs');

const formatUrlFn = `
const formatImgUrl = (url?: string | null) => {
  if (!url) return '';
  const driveMatch = url.match(/drive\\.google\\.com\\/file\\/d\\/([^/]+)/);
  if (driveMatch) {
    return \`https://drive.google.com/uc?export=view&id=\${driveMatch[1]}\`;
  }
  return url;
};
`;

function patchFile(path, replacer) {
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('formatImgUrl')) {
    content = content.replace(/export default function \w+\s*\([^)]*\)\s*\{/, match => formatUrlFn + "\n" + match);
    content = replacer(content);
    fs.writeFileSync(path, content);
    console.log('Patched ' + path);
  }
}

patchFile('src/components/CMSDashboard.tsx', c => {
  return c.replace(/<img src=\{profileLogoUrl\}/g, '<img src={formatImgUrl(profileLogoUrl)} referrerPolicy="no-referrer"')
          .replace(/<img src=\{profileHeroUrl\}/g, '<img src={formatImgUrl(profileHeroUrl)} referrerPolicy="no-referrer"');
});

patchFile('src/components/Hero.tsx', c => {
  return c.replace(/src=\{heroInfo\?\.heroUrl \|\| heroImg\}/g, 'src={heroInfo?.heroUrl ? formatImgUrl(heroInfo.heroUrl) : heroImg} referrerPolicy="no-referrer"');
});

patchFile('src/components/Navbar.tsx', c => {
  return c.replace(/src=\{heroInfo\?\.logoUrl \|\| logoImg\}/g, 'src={heroInfo?.logoUrl ? formatImgUrl(heroInfo.logoUrl) : logoImg} referrerPolicy="no-referrer"');
});

patchFile('src/components/Footer.tsx', c => {
  return c.replace(/src=\{heroInfo\?\.logoUrl \|\| logoImg\}/g, 'src={heroInfo?.logoUrl ? formatImgUrl(heroInfo.logoUrl) : logoImg} referrerPolicy="no-referrer"');
});
