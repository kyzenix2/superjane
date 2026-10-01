import sharp from "sharp";

const source = "public/logo.png";
const image = sharp(source);
const meta = await image.metadata();
const width = meta.width ?? 0;
const cropHeight = 476;

const cropped = sharp(source).extract({ left: 0, top: 0, width, height: cropHeight }).ensureAlpha();
const { data, info } = await cropped.raw().toBuffer({ resolveWithObject: true });

let rSum = 0;
let gSum = 0;
let bSum = 0;
let samples = 0;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (min >= 236) {
    data[i + 3] = 0;
  } else if (min > 205 && max > 215) {
    const fade = (min - 205) / 31;
    data[i + 3] = Math.max(0, Math.round((1 - fade) * 255));
  }

  if (data[i + 3] > 180 && g > r + 10 && g > 70) {
    rSum += r;
    gSum += g;
    bSum += b;
    samples += 1;
  }
}

const cut = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toBuffer();

await sharp(cut).png().toFile("public/mascot.png");

const sized = await sharp(cut).resize(380, 380, { fit: "inside" }).png().toBuffer();
await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: "#071614",
  },
})
  .composite([{ input: sized, gravity: "centre" }])
  .png()
  .toFile("app/icon.png");

if (samples) {
  console.log(
    "teal",
    Math.round(rSum / samples),
    Math.round(gSum / samples),
    Math.round(bSum / samples),
    "samples",
    samples,
  );
}

const out = await sharp("public/mascot.png").metadata();
console.log("mascot", out.width, out.height, "from", width, meta.height);
