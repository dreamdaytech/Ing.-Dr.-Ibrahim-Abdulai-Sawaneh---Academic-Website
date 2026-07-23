const fs = require('fs');
let code = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

// 1. Add states
const stateTarget = "const [profileAddress, setProfileAddress] = useState(heroInfo?.address || '');";
const stateReplacement = stateTarget + "\n  const [profileLogoUrl, setProfileLogoUrl] = useState(heroInfo?.logoUrl || '');\n  const [profileHeroUrl, setProfileHeroUrl] = useState(heroInfo?.heroUrl || '');\n  const [isUploadingImg, setIsUploadingImg] = useState(false);";
code = code.replace(stateTarget, stateReplacement);

// 2. Add to useEffect
const effectTarget = "setProfileAddress(heroInfo.address || '');";
const effectReplacement = effectTarget + "\n      setProfileLogoUrl(heroInfo.logoUrl || '');\n      setProfileHeroUrl(heroInfo.heroUrl || '');";
code = code.replace(effectTarget, effectReplacement);

// 3. Add to save logic
const saveTarget = "address: profileAddress\n          };";
const saveReplacement = "address: profileAddress,\n            logoUrl: profileLogoUrl,\n            heroUrl: profileHeroUrl\n          };";
code = code.replace(saveTarget, saveReplacement);

// 4. Add UI fields
const uiTarget = "{/* Hero Fields */}\n                      <div>\n                        <label";
const uiReplacement = `{/* Hero Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Logo Image URL</label>
                          <input
                            type="text"
                            value={profileLogoUrl}
                            onChange={(e) => setProfileLogoUrl(e.target.value)}
                            placeholder="https://... or /logo.png"
                            className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none mb-2"
                          />
                          <input type="file" accept="image/*" onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              setIsUploadingImg(true);
                              try {
                                const url = await uploadFile(e.target.files[0], 'site/logo_' + Date.now());
                                setProfileLogoUrl(url);
                              } catch(err) {
                                alert("Failed to upload image. Storage rules might need to be configured.");
                              } finally {
                                setIsUploadingImg(false);
                              }
                            }
                          }} className="text-xs" disabled={isUploadingImg} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Hero Image URL</label>
                          <input
                            type="text"
                            value={profileHeroUrl}
                            onChange={(e) => setProfileHeroUrl(e.target.value)}
                            placeholder="https://... or /hero.jpg"
                            className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none mb-2"
                          />
                          <input type="file" accept="image/*" onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              setIsUploadingImg(true);
                              try {
                                const url = await uploadFile(e.target.files[0], 'site/hero_' + Date.now());
                                setProfileHeroUrl(url);
                              } catch(err) {
                                alert("Failed to upload image. Storage rules might need to be configured.");
                              } finally {
                                setIsUploadingImg(false);
                              }
                            }
                          }} className="text-xs" disabled={isUploadingImg} />
                        </div>
                      </div>
                      <div>
                        <label`;
code = code.replace(uiTarget, uiReplacement);

fs.writeFileSync('src/components/CMSDashboard.tsx', code, 'utf8');
console.log('Patched CMSDashboard');
