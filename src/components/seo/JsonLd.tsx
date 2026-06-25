// مكوّن حقن بيانات Schema.org (JSON-LD) بأمان داخل <script>
// نهرب من المحرف '<' لمنع كسر وسم </script> (حماية من XSS).

type JsonLdData = Record<string, unknown>;

function serialize(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({data}: {data: JsonLdData | JsonLdData[]}) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: serialize(item)}}
        />
      ))}
    </>
  );
}
