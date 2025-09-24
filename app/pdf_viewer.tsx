import { LinearGradient } from "expo-linear-gradient";
import PDFViewerFromAsset from "@/components/custom/PDFViewer";
import { useLocalSearchParams } from "expo-router";

export default function PDFViewerScreen() {
  const params = useLocalSearchParams();

  const paperLink = params.paperLink
    ? decodeURIComponent(params.paperLink as string)
    : undefined;

  const paperTitle = params.paperTitle
    ? decodeURIComponent(params.paperTitle as string)
    : undefined;

  const part = params.part as string | undefined;
  const year = params.year as string | undefined;

  const fullTitle = paperTitle
    ? part
      ? `${paperTitle} - Part ${part}`
      : paperTitle
    : "PDF Viewer";

  return (
    <LinearGradient colors={["#F7F4EF", "#ffeac6ff"]} style={{ flex: 1 }}>
      <PDFViewerFromAsset githubpdfUrl={paperLink || ""} title={fullTitle}  year={year}/>
    </LinearGradient>
  );
}
