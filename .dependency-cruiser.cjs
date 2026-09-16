module.exports = {
  forbidden: [
    {
      name: "domain-no-framework-deps",
      comment: "Domain must not depend on any framework or infrastructure",
      severity: "error",
      from: { path: "^packages/domain" },
      to: { path: "^packages/(application|infrastructure|agent)" }
    },
    {
      name: "no-cross-module-reach",
      comment: "Modules talk only through ports/event-bus, not direct import",
      severity: "error",
      from: { path: "^packages/application/src/use-cases/(library|reader|chat)" },
      to: { path: "^packages/application/src/use-cases/(?!\\1)" }
    }
  ],
  options: { tsConfig: { fileName: "tsconfig.base.json" } }
};