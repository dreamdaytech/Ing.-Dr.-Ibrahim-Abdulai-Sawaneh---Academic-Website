const fs = require('fs');
let code = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

const target = `                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Scholarly Full Name *</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
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
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Avatar Initials *</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={profileAvatarPlaceholder}
                          onChange={(e) => setProfileAvatarPlaceholder(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-mono"
                        />
                      </div>
                    </div>`;

const replacement = `                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Scholarly Full Name *</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Avatar Initials *</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={profileAvatarPlaceholder}
                          onChange={(e) => setProfileAvatarPlaceholder(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-mono"
                        />
                      </div>
                      <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/CMSDashboard.tsx', code, 'utf8');
    console.log("Patched layout successfully");
} else {
    console.log("Could not find target block");
}
