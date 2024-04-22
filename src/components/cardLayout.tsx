import Link from "next/link";
import Image from "next/image";
import line from "../../public/line.svg";

export default function CardLayout() {
  const interactiveCardList = [
    {
      title: "Work",
      description: "projects I've done so far",
      link: "/projects",
    },
    {
      title: "Socials",
      description: "I'm everywhere",
      link: "/socials",
      openInNewTab: true,
    },
    {
      title: "Resume",
      description: "reasons to hire me in a pdf",
      link: "",
      openInNewTab: true,
    },
    {
      title: "Ask me anything!",
      description: "have a chat with my AI",
      link: "/explore",
    },
  ];

  return (
    <div>
      <div className="flex h-80 items-start">
        <div className="mr-6">
          <Image
            src={line}
            alt="gradient line"
            width={286}
            height={1}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex h-full w-full flex-col gap-1">
          {interactiveCardList.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="group flex items-center justify-between rounded-lg border border-cardBorder bg-background p-4 text-dark transition-all duration-75 ease-linear hover:border-primary hover:bg-cardBg"
              target={card.openInNewTab ? "_blank" : "_self"}
              rel={card.openInNewTab ? "noopener noreferrer" : ""}>
              <h1 className="text-primary">{card.title}</h1>
              <p className="text-sm text-dark/80 group-hover:text-primary">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
