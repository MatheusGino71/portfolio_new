import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Vite handles image/video sources, but not download links or data attributes.
// Emit their files and resolve those URLs in the production HTML as well.
function portfolioAssets() {
  const linkedFiles = [
    'curriculo/Matheus_Silva_Gino_Curriculo_2026.pdf',
    'curriculo/Currículo_MATHEUSGINO.pdf',
    'projetos/nexus.mp4',
    'projetos/zenit.mp4',
    'projetos/lp_xadascinco.mp4',
  ];
  const references = new Map();

  return {
    name: 'portfolio-linked-assets',
    apply: 'build',
    enforce: 'post',
    buildStart() {
      for (const path of linkedFiles) {
        references.set(path, this.emitFile({
          type: 'asset',
          name: basename(path),
          source: readFileSync(fileURLToPath(new URL(path, import.meta.url))),
        }));
      }
      // Social crawlers use the stable, absolute URL in the sharing metadata.
      this.emitFile({
        type: 'asset',
        fileName: 'media/foto_profissional.jpeg',
        source: readFileSync(fileURLToPath(new URL('media/foto_profissional.jpeg', import.meta.url))),
      });
    },
    generateBundle: { order: 'post', handler(_options, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      let source = String(html.source);
      for (const [path, reference] of references) {
        const emittedPath = this.getFileName(reference);
        source = source.replaceAll(`"./${path}"`, `"./${emittedPath}"`);
        source = source.replaceAll(`"./${encodeURI(path)}"`, `"./${emittedPath}"`);
      }
      html.source = source;
    } },
  };
}

export default defineConfig({ plugins: [portfolioAssets()] });
