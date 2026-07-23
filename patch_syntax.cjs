const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "            ) : (\n\n              activeModel === 'messages' ? (",
  "            ) : activeModel === 'messages' ? ("
);

c = c.replace(
  "              </form>\n            )}\n            )}\n          </div>\n        </div>\n      </div>",
  "              </form>\n            )}\n          </div>\n        </div>\n      </div>"
);

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
