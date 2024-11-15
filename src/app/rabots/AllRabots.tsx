import React from 'react';
import RabotCard from './RabotCard';

type TDummyRabots = {
  botId: number;
  name: string;
  subtitle: string;
  description: string;
};

const dummyRabots: TDummyRabots[] = [
  {
    botId: 1,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
  {
    botId: 2,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
  {
    botId: 3,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
  {
    botId: 4,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
  {
    botId: 5,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
  {
    botId: 6,
    name: 'bot-1',
    subtitle: 'Earn 3-4% APR  with ezETH',
    description:
      'Adipisicing ipsum do ea Lorem id ex veniam adipisicing est sint. Occaecat sit reprehenderit nostrud velit minim laboris laboris dolor dolore enim. Aliquip consectetur exercitation ',
  },
];

const AllRabots = () => {
  return (
    <div className='h-full rounded-md bg-[#121212] overflow-y-scroll px-6 py-3'>
      <h3>Rabots</h3>
      <div className=' flex flex-wrap gap-2'>
        {dummyRabots.map((rabot) => (
          <RabotCard
            key={rabot.botId}
            name={rabot.name}
            botId={rabot.botId}
            description={rabot.description}
            subtitle={rabot.subtitle}
          />
        ))}
      </div>
    </div>
  );
};

export default AllRabots;
