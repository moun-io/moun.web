import Modal from "@/components/banner/modal";
export default function ArtistModal({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  console.log("uid", params.uid);

  return (
    params.uid && (
      <Modal>
        <div className="bg-white w-8">d</div>
      </Modal>
    )
  );
}
