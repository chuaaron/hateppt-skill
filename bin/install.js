#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const home = os.homedir();
const isGlobal = process.argv.includes('--global') || process.argv.includes('-g');

// 支持 Claude Code, Antigravity, Hermes, Cursor 等 Agent
const candidateDirs = isGlobal ? [
  path.join(home, '.claude', 'skills', 'hateppt-presentation'),
  path.join(home, '.gemini', 'config', 'skills', 'hateppt-presentation'),
  path.join(home, '.hermes', 'skills', 'hateppt-presentation'),
  path.join(home, '.agents', 'skills', 'hateppt-presentation'),
] : [
  path.join(process.cwd(), '.agents', 'skills', 'hateppt-presentation'),
  path.join(process.cwd(), '.claude', 'skills', 'hateppt-presentation'),
];

const skillSource = path.join(__dirname, '..', 'SKILL.md');

let installedCount = 0;
for (const targetDir of candidateDirs) {
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(skillSource, path.join(targetDir, 'SKILL.md'));
    console.log(`✅ Installed HatePPT Skill to: ${targetDir}`);
    installedCount++;
  } catch (err) {}
}

if (installedCount > 0) {
  console.log(`\n🎉 HatePPT Skill installed! Run your agent and ask it to generate slides for hateppt.com.`);
}
