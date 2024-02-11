import Modal from "@/components/banner/modal";
export default function ArtistModal({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  console.log("uid", params.uid);

  return params.uid && <Modal>{params.uid}</Modal>;
}
