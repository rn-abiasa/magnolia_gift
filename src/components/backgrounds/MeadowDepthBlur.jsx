/**
 * Lapisan bukit & ladang bunga di kejauhan (depth blur).
 * Tiap layer memakai tingkat blur berbeda supaya tercipta ilusi kedalaman:
 * back (paling kabur) -> mid -> front (paling tajam).
 */
const MEADOW_LAYERS = [
  {
    id: "meadow-back",
    className:
      "h-[48vh] blur-[14px] opacity-85 bg-[image:radial-gradient(ellipse_at_25%_100%,#879978_0%,#7d8e6e_60%,transparent_80%),radial-gradient(ellipse_at_75%_100%,#9987a0_0%,#897893_50%,transparent_75%),linear-gradient(to_top,#7e947b_0%,rgba(142,168,140,0.4)_60%,transparent_100%)]",
  },
  {
    id: "meadow-mid",
    className:
      "h-[38vh] blur-[6px] opacity-90 bg-[image:radial-gradient(circle_at_15%_90%,rgba(107,82,174,0.45)_0%,transparent_40%),radial-gradient(circle_at_45%_85%,rgba(220,180,240,0.4)_0%,transparent_45%),radial-gradient(circle_at_80%_90%,rgba(125,95,185,0.45)_0%,transparent_40%),radial-gradient(circle_at_60%_95%,rgba(245,205,120,0.35)_0%,transparent_35%),linear-gradient(to_top,#506e4c_0%,rgba(95,126,92,0.6)_50%,transparent_100%)]",
  },
  {
    id: "meadow-front",
    className:
      "h-[24vh] blur-[1.5px] opacity-95 bg-[image:radial-gradient(ellipse_at_30%_100%,rgba(61,90,69,0.8)_0%,transparent_60%),radial-gradient(ellipse_at_70%_100%,rgba(74,62,114,0.35)_0%,transparent_55%),linear-gradient(to_top,#395238_0%,rgba(61,90,69,0.3)_70%,transparent_100%)]",
  },
];

export default function MeadowDepthBlur() {
  return (
    <>
      {MEADOW_LAYERS.map((layer) => (
        <div
          key={layer.id}
          aria-hidden="true"
          className={`absolute bottom-0 left-0 w-full bg-repeat-x ${layer.className}`}
        />
      ))}
    </>
  );
}
