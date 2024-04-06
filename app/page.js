import Link from "next/link";
import Qeustion from "./Question";

export default async function Home() {
  const currentTimestamp = Date.now();

  const sevenDaysAgoTimestamp = currentTimestamp - 7 * 24 * 60 * 60 * 1000;

  const currentUnixTimestamp = Math.floor(currentTimestamp / 1000);
  const sevenDaysAgoUnixTimestamp = Math.floor(sevenDaysAgoTimestamp / 1000);

  const recentQuery = await fetch(
    `https://api.stackexchange.com/2.3/questions?pagesize=10&order=desc&sort=creation&tagged=artificial-intelligence&site=stackoverflow.com&filter=withbody`
  );
  const votedQuery = await fetch(
    `https://api.stackexchange.com/2.3/questions?pagesize=10&fromdate=${sevenDaysAgoUnixTimestamp}&todate=${currentUnixTimestamp}&order=desc&sort=votes&tagged=artificial-intelligence&site=stackoverflow.com&filter=withbody`
  );

  const recentQuestions = await recentQuery.json();
  const votedQuestions = await votedQuery.json();

  return (
    <div className="">
      <div className="text-blue-500 text-xl p-4 pb-0 font-bold">
        Most recent AI questions on stackoverflow.com
      </div>
      <div className="m-4">
        {recentQuestions.items.map((item) => (
          <Qeustion key={item.question_id} item={item} />
        ))}
      </div>
      <div className="text-blue-500 text-xl p-4 pb-0 font-bold">
        Top voted AI questions on stackoverflow.com in the past week
      </div>
      <div className="m-4">
        {votedQuestions.items.map((item) => (
          <Qeustion key={item.question_id} item={item} />
        ))}
      </div>
    </div>
  );
}
