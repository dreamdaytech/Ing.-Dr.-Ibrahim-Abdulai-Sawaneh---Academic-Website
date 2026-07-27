const fs = require('fs');
let c = fs.readFileSync('src/components/ContactSection.tsx', 'utf8');

// Remove the duplicated block from Form A (msgSecurity is the correct one for Form A, collabSecurity is the wrong one in Form A)
const duplicatedBlock = `                    <div className="pt-2 border-t border-editorial-border-light">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Security Question: What is {num1} + {num2}? *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter the sum"
                        value={collabSecurity}
                        onChange={(e) => setCollabSecurity(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                      />
                    </div>

`;
c = c.replace(duplicatedBlock, '');

// Now add it to Form B just before the button
const targetInFormB = `                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingCollab}`;

const replaceWith = `                      />
                    </div>

                    <div className="pt-2 border-t border-editorial-border-light">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Security Question: What is {num1} + {num2}? *</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter the sum"
                        value={collabSecurity}
                        onChange={(e) => setCollabSecurity(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-navy bg-[#FBFBF9]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingCollab}`;

c = c.replace(targetInFormB, replaceWith);
fs.writeFileSync('src/components/ContactSection.tsx', c);
