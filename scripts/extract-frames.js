const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegStatic);

const inputVideo = process.argv[2];
const outputDir = path.join(process.cwd(), 'public', 'images', 'hero-frames');

if (!inputVideo) {
  console.error('\nUsage: node scripts/extract-frames.js <path/to/video.mp4>\n');
  process.exit(1);
}

if (!fs.existsSync(inputVideo)) {
  console.error(`\nError: File not found at ${inputVideo}\n`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  // Clean up existing frames
  console.log('Cleaning up old frames...');
  fs.readdirSync(outputDir).forEach(file => {
    if (file.endsWith('.jpg')) {
      fs.unlinkSync(path.join(outputDir, file));
    }
  });
}

// Target 30fps to ensure smooth scrolling
// 16s * 30fps = ~480 frames
console.log(`Extracting frames from ${inputVideo} to ${outputDir}...`);
console.log('This may take a minute depending on video length and quality.');

ffmpeg(inputVideo)
  .outputOptions([
    '-vf', 'fps=30,scale=1920:-1', 
    '-q:v', '5' // Quality scale (2-31, lower is better. 5 is good for web frame sequences)
  ])
  .output(path.join(outputDir, 'frame_%04d.jpg'))
  .on('end', () => {
    console.log('\n✅ Frame extraction complete!');
    console.log(`Frames saved to: ${outputDir}\n`);
  })
  .on('error', (err) => {
    console.error('\n❌ Error extracting frames:', err);
  })
  .run();
