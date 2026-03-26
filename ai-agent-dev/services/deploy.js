const axios = require("axios");

module.exports = {
  async run(target = 'staging') {
    if (!process.env.PAPUYU_URL) {
      throw new Error("PAPUYU_URL is not defined in the environment.");
    }
    
    // In actual implementation, send a request to Papuyu PaaS webhook
    const _url = \`\${process.env.PAPUYU_URL}/deploy?target=\${target}\`;
    console.log(\`[Deploy] Triggering deploy webhook to \${_url}...\`);
    
    try {
      await axios.post(_url, {}, { timeout: 10000 });
      return true;
    } catch (e) {
      console.warn("[Deploy] Deploy triggered but webhook might not be accessible yet or failed:", e.message);
      // For testing, do not throw if Papuyu is just a mock url
      return false;
    }
  }
};
