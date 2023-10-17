import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image
        src="/images/profile.jpg"
        width={144}
        height={144}
        alt="Your Name"
      />
    </div>
  );
}
