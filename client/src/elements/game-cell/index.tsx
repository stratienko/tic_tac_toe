import { GameCellsEnum } from '@/shared/enums';
import { cn } from '@/utils/cn';
import styles from './styles.module.css';

type Props = {
  disabled?: boolean;
  index: number;
  value: string;

  onClick: () => void;
};

const cellClassNames = {
  0: 'bg-white border-black border-r border-b',
  1: 'bg-white border-black border-l border-b border-r',
  2: 'bg-white border-black border-l border-b',
  3: 'bg-white border-black border-t border-r border-b',
  4: 'bg-white border-black border',
  5: 'bg-white border-black border-t border-l border-b',
  6: 'bg-white border-black border-t border-r',
  7: 'bg-white border-black border-l border-t border-r',
  8: 'bg-white border-black border-l border-t',
};

export const GameCell = (props: Props) => {
  const { disabled, index, onClick, value } = props;

  const className = cellClassNames[index as keyof typeof cellClassNames];

  if (value === GameCellsEnum.X)
    return (
      <div className={cn('flex size-full items-center justify-center', className)}>
        <span className={cn('relative size-1/2 border-black', styles['game-cell-content'])}>
          <span className="absolute left-1/2 h-full w-1 -translate-x-1/2 rotate-45 bg-black" />

          <span className="absolute left-1/2 h-full w-1 -translate-x-1/2 -rotate-45 bg-black" />
        </span>
      </div>
    );

  if (value === GameCellsEnum.O)
    return (
      <div className={cn('flex size-full items-center justify-center', className)}>
        <span className={cn('size-1/2 rounded-full border-4 border-black', styles['game-cell-content'])} />
      </div>
    );

  return (
    <button
      className={cn('size-full outline-4 outline-blue-600 transition-all focus:z-10 focus:outline', className)}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
