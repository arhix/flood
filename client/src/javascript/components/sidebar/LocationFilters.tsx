import {FC, useState} from 'react';
import {observer} from 'mobx-react';
import {useLingui} from '@lingui/react';

import SidebarFilter from './SidebarFilter';
import Expando from './Expando';
import TorrentFilterStore from '../../stores/TorrentFilterStore';

const LocationFilters: FC = observer(() => {
  const {i18n} = useLingui();
  const [expanded, setExpanded] = useState<boolean>(true);

  const locations = Object.keys(TorrentFilterStore.taxonomy.locationCounts);

  if (locations.length === 1 && locations[0] === '') {
    return null;
  }

  const filterItems = locations.slice().sort((a, b) => {
    if (a === '') {
      return -1;
    }

    if (b === '') {
      return 1;
    }

    return a.localeCompare(b);
  });

  const filterElements = filterItems.map((filter) => (
    <SidebarFilter
      handleClick={(location, event) => TorrentFilterStore.setLocationFilters(location, event)}
      count={TorrentFilterStore.taxonomy.locationCounts[filter] || 0}
      key={filter}
      isActive={
        (filter === '' && !TorrentFilterStore.locationFilter.length) ||
        TorrentFilterStore.locationFilter.includes(filter)
      }
      name={filter}
      slug={filter}
      size={TorrentFilterStore.taxonomy.locationSizes[filter]}
    />
  ));

  const title = i18n._('filter.location.title');

  const expandoClick = () => {
    setExpanded(!expanded);
  };

  return (
    <ul aria-label={title} className="sidebar-filter sidebar__item" role="menu">
      <li className="sidebar-filter__item" role="none">
        <Expando className="sidebar-filter__item--heading" expanded={expanded} handleClick={expandoClick}>
          {title}
        </Expando>
      </li>
      {expanded && filterElements}
    </ul>
  );
});

export default LocationFilters;
