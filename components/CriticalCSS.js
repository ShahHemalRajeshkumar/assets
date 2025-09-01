const CriticalCSS = () => (
  <style jsx global>{`
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; }
    .loading { opacity: 0; }
    .loaded { opacity: 1; }
    img { max-width: 100%; height: auto; }
    * { box-sizing: border-box; }
  `}</style>
);

export default CriticalCSS;