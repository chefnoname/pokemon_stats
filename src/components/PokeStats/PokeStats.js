import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import './PokeStats.css';

const PokeStats = ({ pokemon }) => {
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  useEffect(() => {
    fetch(pokemon)
      .then(res => res.json())
      .then(data => setPokemonAbilities(data));
  }, []);

  const statsTitle = [
    ['HP', 'orange'],
    ['ATTACK', 'red'],
    ['DEFENSE', 'green'],
    ['SPECIAL-ATTACK', 'blue'],
    ['SPECIAL-DEFENSE', '#64b1bd'],
    ['SPEED', '#452a6b'],
  ];

  if (pokemonAbilities.length === 0) {
    return <h1>...loading</h1>;
  }

  const {
    sprites: { front_default: pokePic },
    name,
    types,
    abilities,
    stats,
  } = pokemonAbilities;

  return (
    <Card
      sx={{ maxWidth: 345, marginRight: 1, marginBottom: 10 }}
      className={types[0].type.name}
    >
      <CardMedia component='img' height='350' image={pokePic} />
      <CardContent sx={{ background: 'white' }}>
        <Typography
          gutterBottom
          variant='h4'
          component='div'
          style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}
        >
          NAME: {name.toUpperCase()}
        </Typography>
        <Typography
          variant='body2'
          color='green'
          sx={{
            borderTop: '2px solid black',
            borderBottom: '2px solid black',
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          TYPE:{' '}
          {types.map(({ type: { name } }, i) =>
            i > 0 ? ', ' + name.toUpperCase() : name.toUpperCase()
          )}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            borderBottom: '2px solid black',
            textAlign: 'center',
            fontSize: 25,
            wordWrap: 'break-word',
            fontWeight: 'bold',
          }}
        >
          ABILITIES:{' '}
          {abilities.map(({ ability: { name } }, i) =>
            i > 0 ? ', ' + name.toUpperCase() : name.toUpperCase()
          )}
        </Typography>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            textAlign: 'center',
            fontSize: 25,
          }}
        >
          <p>BASE STATS:</p>

          {stats.map(({ base_stat: baseStat }, i) => (
            <ListItem
              sx={{
                marginBottom: 1,
                marginLeft: 3,
                color: statsTitle[i][1],
              }}
              key={i}
              disablePadding
            >
              <ListItemText primary={`${statsTitle[i][0]}: ${baseStat}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PokeStats;
