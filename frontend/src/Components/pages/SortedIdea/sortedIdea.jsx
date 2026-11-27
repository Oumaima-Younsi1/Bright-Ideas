import { useState } from 'react';
import styles from './sortedIdea.module.css';

function SortedIdea({ ideas = [] }) 
{

  const [sortOrder, setSortOrder] = useState('desc');

  const sorted = [...ideas].sort((a, b) => {
    return sortOrder === 'desc'
      ? b.likes - a.likes
      : a.likes - b.likes;
  });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className={styles.sortContainer}>

      <div className={styles.sortHeader}>
        <h2>Classer les idées</h2>

        <select
          value={sortOrder}
          onChange={handleSortChange}
        >
          <option value="desc">Plus de likes</option>
          <option value="asc">Moins de likes</option>
        </select>
      </div>

      <div className={styles.ideasList}>

        {sorted.map((idea) => (
          <div
            className={styles.ideaItem}
            key={idea._id || idea.id}
          >
            <h3>{idea.title}</h3>

            <span className={styles.likes}>
              ❤️ {idea.likes} likes
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default SortedIdea;

