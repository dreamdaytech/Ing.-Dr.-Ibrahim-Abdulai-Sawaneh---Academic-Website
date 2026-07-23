const fs = require('fs');
let c = fs.readFileSync('src/components/CMSDashboard.tsx', 'utf8');

c = c.replace(
  "              </form>\n            )}\n          </div>\n        </div>\n      </div>",
  "              </form>\n            )}\n            )}\n          </div>\n        </div>\n      </div>"
);

c = c.replace(
  "              )}\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}",
  "          </div>\n        </div>\n      </div>\n    </div>\n  );\n}"
); // revert the bad replace

fs.writeFileSync('src/components/CMSDashboard.tsx', c);
