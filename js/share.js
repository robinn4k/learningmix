// ─── Share Image Generator & Modal ───────────────────────────
import { getLang, t } from './lang.js';

const CARD_W = 1080;
const CARD_H = 1350;

// ─── i18n strings used in the canvas ────────────────────────
const CANVAS_STRINGS = {
  scoreLabel: { es: 'PUNTUACIÓN', en: 'SCORE', fr: 'SCORE', pt: 'PONTUAÇÃO', de: 'PUNKTZAHL' },
  ptsLabel:   { es: 'puntos',     en: 'points', fr: 'points', pt: 'pontos',   de: 'Punkte'    },
  correct:    { es: 'Correctas',  en: 'Correct', fr: 'Correct', pt: 'Corretas', de: 'Richtig' },
  accuracy:   { es: 'Precisión',  en: 'Accuracy', fr: 'Précision', pt: 'Precisão', de: 'Genauigkeit' },
  bonus:      { es: 'Bonus',      en: 'Bonus',   fr: 'Bonus',  pt: 'Bônus',   de: 'Bonus'    },
  tagline:    { es: '¿Puedes superarme?', en: 'Can you beat me?', fr: 'Tu peux faire mieux ?', pt: 'Você consegue me superar?', de: 'Kannst du mich schlagen?' },
};

function cl(key, lang) {
  return (CANVAS_STRINGS[key] || {})[lang] || CANVAS_STRINGS[key]?.en || '';
}

// ─── Rounded rect helper ─────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── Wait for fonts to load ──────────────────────────────────
async function waitForFonts() {
  try {
    await Promise.all([
      document.fonts.load('700 64px "Open Sans"'),
      document.fonts.load('400 44px "Open Sans"'),
    ]);
  } catch { /* fallback to system fonts */ }
}

// ─── Main image generator ────────────────────────────────────
export async function generateShareImage(data) {
  await waitForFonts();

  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  const lang = getLang();

  // ── Background gradient ──────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
  bg.addColorStop(0,   '#1c0b14');
  bg.addColorStop(0.5, '#0d0508');
  bg.addColorStop(1,   '#180a0f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // ── Amber glow behind score ──────────────────────────────
  const glow = ctx.createRadialGradient(CARD_W / 2, 520, 0, CARD_W / 2, 520, 480);
  glow.addColorStop(0, 'rgba(201,151,28,0.18)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // ── Top accent bar ───────────────────────────────────────
  const topBar = ctx.createLinearGradient(0, 0, CARD_W, 0);
  topBar.addColorStop(0,   'transparent');
  topBar.addColorStop(0.5, 'rgba(201,151,28,0.6)');
  topBar.addColorStop(1,   'transparent');
  ctx.fillStyle = topBar;
  ctx.fillRect(0, 0, CARD_W, 5);

  // ── Bottom accent bar ────────────────────────────────────
  ctx.fillStyle = topBar;
  ctx.fillRect(0, CARD_H - 5, CARD_W, 5);

  // ── Branding: 🍸 Stirio ──────────────────────────────────
  const fontStack = '"Open Sans", system-ui, sans-serif';
  ctx.textAlign = 'center';

  ctx.font = `700 72px ${fontStack}`;
  ctx.fillStyle = '#c9971c';
  ctx.fillText('Stirio 🍸', CARD_W / 2, 120);

  // ── Gold separator line ──────────────────────────────────
  const line = ctx.createLinearGradient(0, 0, CARD_W, 0);
  line.addColorStop(0,   'transparent');
  line.addColorStop(0.3, 'rgba(201,151,28,0.4)');
  line.addColorStop(0.7, 'rgba(201,151,28,0.4)');
  line.addColorStop(1,   'transparent');
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 158);
  ctx.lineTo(CARD_W - 80, 158);
  ctx.stroke();

  // ── Category / Mode (translate at render time for current language) ──
  const categoryLabel = data.category ? t(data.category) : '';
  ctx.font = `400 46px ${fontStack}`;
  ctx.fillStyle = 'rgba(240,230,211,0.75)';
  ctx.fillText(categoryLabel, CARD_W / 2, 230);

  // ── Score label (small caps style) ──────────────────────
  ctx.font = `700 32px ${fontStack}`;
  ctx.fillStyle = 'rgba(201,151,28,0.65)';
  ctx.fillText(cl('scoreLabel', lang), CARD_W / 2, 330);

  // ── Big score (gradient) ─────────────────────────────────
  const scoreGrad = ctx.createLinearGradient(0, 360, 0, 600);
  scoreGrad.addColorStop(0, '#f5d060');
  scoreGrad.addColorStop(0.6, '#c9971c');
  scoreGrad.addColorStop(1, '#8a6610');
  ctx.font = `700 230px ${fontStack}`;
  ctx.fillStyle = scoreGrad;
  ctx.fillText(String(data.score), CARD_W / 2, 580);

  // ── Points sub-label ─────────────────────────────────────
  ctx.font = `300 38px ${fontStack}`;
  ctx.fillStyle = 'rgba(240,230,211,0.45)';
  ctx.fillText(cl('ptsLabel', lang), CARD_W / 2, 650);

  // ── Stat cards ───────────────────────────────────────────
  const stats = [
    { icon: '✅', value: `${data.corrects}/${data.total}`, label: cl('correct', lang) },
    { icon: '🎯', value: `${data.accuracy}%`,             label: cl('accuracy', lang) },
    { icon: '⚡', value: `+${data.timeBonus}`,             label: cl('bonus', lang) },
  ];

  const cardY = 720;
  const cardH = 210;
  const gap   = 24;
  const side  = 80;
  const totalGap = gap * (stats.length - 1);
  const cardW = (CARD_W - side * 2 - totalGap) / stats.length;

  stats.forEach((s, i) => {
    const cx = side + i * (cardW + gap);

    // Card bg
    roundRect(ctx, cx, cardY, cardW, cardH, 22);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fill();
    roundRect(ctx, cx, cardY, cardW, cardH, 22);
    ctx.strokeStyle = 'rgba(201,151,28,0.28)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Icon — reset fillStyle so emoji render at full opacity
    ctx.fillStyle = '#ffffff';
    ctx.font = '64px serif';
    ctx.textAlign = 'center';
    ctx.fillText(s.icon, cx + cardW / 2, cardY + 80);

    // Value
    ctx.font = `700 52px ${fontStack}`;
    ctx.fillStyle = '#e8b830';
    ctx.fillText(s.value, cx + cardW / 2, cardY + 148);

    // Label
    ctx.font = `400 28px ${fontStack}`;
    ctx.fillStyle = 'rgba(240,230,211,0.55)';
    ctx.fillText(s.label, cx + cardW / 2, cardY + 190);
  });

  // ── Separator ────────────────────────────────────────────
  ctx.strokeStyle = line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 988);
  ctx.lineTo(CARD_W - 120, 988);
  ctx.stroke();

  // ── Tagline ──────────────────────────────────────────────
  ctx.font = `700 62px ${fontStack}`;
  ctx.fillStyle = '#f0e6d3';
  ctx.textAlign = 'center';
  ctx.fillText(cl('tagline', lang), CARD_W / 2, 1090);

  // ── Date ─────────────────────────────────────────────────
  const localeMap = { es: 'es-ES', en: 'en-US', fr: 'fr-FR', pt: 'pt-BR', de: 'de-DE' };
  const dateStr = new Date().toLocaleDateString(localeMap[lang] || 'en-US', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  ctx.font = `400 34px ${fontStack}`;
  ctx.fillStyle = 'rgba(240,230,211,0.35)';
  ctx.fillText(dateStr, CARD_W / 2, 1170);

  // ── Gold separator (bottom) ───────────────────────────────
  ctx.strokeStyle = line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 1218);
  ctx.lineTo(CARD_W - 120, 1218);
  ctx.stroke();

  // ── App URL ──────────────────────────────────────────────
  ctx.font = `400 30px ${fontStack}`;
  ctx.fillStyle = 'rgba(201,151,28,0.5)';
  ctx.fillText('stirio.app', CARD_W / 2, 1290);

  return canvas;
}

// ─── Show Share Modal ────────────────────────────────────────
export async function showShareModal(data) {
  const modal    = document.getElementById('share-modal');
  const preview  = document.getElementById('share-preview-img');
  const spinner  = document.getElementById('share-spinner');
  const dlBtn    = document.getElementById('btn-share-download');
  const nativeBtn = document.getElementById('btn-share-native');

  if (!modal) return;

  // Reset state
  modal.classList.add('active');
  preview.style.opacity = '0';
  preview.src = '';
  spinner.classList.remove('hidden');
  nativeBtn.style.display = 'none';

  let canvas;
  try {
    canvas = await generateShareImage(data);
  } catch (e) {
    console.error('Error generating share image:', e);
    closeShareModal();
    return;
  }

  const dataUrl = canvas.toDataURL('image/png');

  preview.onload = () => {
    spinner.classList.add('hidden');
    preview.style.opacity = '1';
  };
  preview.src = dataUrl;

  // ── Download button ──────────────────────────────────────
  dlBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'stirio-result.png';
    a.click();
  };

  // ── Native share (mobile) ────────────────────────────────
  canvas.toBlob(async blob => {
    if (!blob) return;
    const file = new File([blob], 'stirio-result.png', { type: 'image/png' });
    const canNativeShare = navigator.canShare && navigator.canShare({ files: [file] });
    if (canNativeShare) {
      nativeBtn.style.display = '';
      nativeBtn.onclick = async () => {
        try {
          await navigator.share({
            title: 'Stirio 🍸',
            text: data.shareText || '',
            files: [file],
          });
        } catch { /* user cancelled */ }
      };
    }
    // Discard canvas memory
    canvas.width = 0;
    canvas.height = 0;
  }, 'image/png');
}

// ─── Close Share Modal ───────────────────────────────────────
export function closeShareModal() {
  const modal   = document.getElementById('share-modal');
  const preview = document.getElementById('share-preview-img');
  if (!modal) return;
  modal.classList.remove('active');
  if (preview) preview.src = '';
}
