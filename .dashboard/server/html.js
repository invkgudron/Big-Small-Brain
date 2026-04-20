const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"']/g, c => ESC_MAP[c]);
}

export function html(strings, ...values) {
  let out = '';
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) {
      const v = values[i];
      if (v && typeof v === 'object' && v.__raw) out += v.value;
      else if (Array.isArray(v)) out += v.map(x => (x && x.__raw ? x.value : escapeHtml(x))).join('');
      else out += escapeHtml(v);
    }
  }
  return out;
}

export function raw(value) {
  return { __raw: true, value: String(value ?? '') };
}
