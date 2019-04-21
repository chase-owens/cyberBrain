import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import birdBrain1 from '../../images/birdbrain.jpg';
import birdBrain2 from '../../images/birdbrain3.jpg';
import birdSkinner from '../../images/birdbrainSkinner.jpg';
import { theme } from '../../styles/theme/theme';

const Inspiration = props => {
  console.log(props);
  return (
    <Paper style={{ width: '100%', height: '100%', paddingTop: 10 }}>
      <Typography variant='h5' style={{ margin: 20 }}>
        Growing up, my dad took me to all the fun places -the park, the zoo, and
        the carnival. For almost every place he took me to, the most vivid of
        memories involve a bird. At the park we always fed bread to the ducks.
        We didn’t know it was bad for them back then. It was at one of our trips
        to the zoo that I was attacked by a bird for the first time, a peacock.
        It wouldn’t let me walk by. It let everyone else walk by, but not me. My
        most fond memory of a bird is a memory from our trips to the carnival.
        At the carnival, there was a chicken that could play tic-tac-toe! It was
        no slouch either. If you made one bad move the chicken would beat you,
        and no-one ever beat the chicken.
      </Typography>
      <br />
      <Grid container justify='center'>
        <Grid item>
          <figure>
            <img
              style={{ maxHeight: 450 }}
              src={birdBrain2}
              alt='SkinnerBailey&Marian'
            />
            <figcaption>
              B. F. Skinner, Robert 'Bob' Bailey, and Marian Breeland Bailey.
              Click{' '}
              <a href='https://www3.uca.edu/iqzoo/Exhibits/bird_brain.htm'>
                here
              </a>{' '}
              for image source
            </figcaption>
          </figure>
        </Grid>
      </Grid>
      <br />
      <Typography variant='h5' style={{ margin: 20 }}>
        Interested in animal training, I began studying the science of behavior
        change. I learned about many creative applications of operant
        conditioning and animal training. I learned about{' '}
        <a
          style={{ textDecoration: 'none' }}
          href='https://en.wikipedia.org/wiki/Project_Pigeon'
        >
          <span style={{ color: theme.palette.secondary.main }}>
            {' '}
            Project Pelican
          </span>
        </a>
        , the first smart bomb, where pigeons were used to peck at specific
        areas on a map to guide a bomb. I learned about studies of chimpanzees
        in space flight. I learned about cats, dogs, birds, and dolphins serving
        as spies for the CIA. Then I learned about IQ Zoo where raccoons were
        trained to play baseball, ducks to play the guitar, pigs to save money
        in piggy banks, and chickens to walk a tightrope, dance to music, and
        even to play baseball. In fact, I learned that the chicken I played
        tic-tac-toe against, was only one of many ‘
        <a
          style={{ textDecoration: 'none' }}
          href='https://www3.uca.edu/iqzoo/Exhibits/bird_brain.htm'
        >
          <span style={{ color: theme.palette.secondary.main }}>
            {' '}
            Bird Brains
          </span>
          .
        </a>
        ’
      </Typography>
      <br />
      <Grid container justify='center'>
        <Grid item>
          <figure>
            <img
              style={{ maxHeight: 450 }}
              src={birdSkinner}
              alt='birdSkinner'
            />
            <figcaption>
              B. F. Skinner trying to beat the Bird Brain, which he never did.
              Click{' '}
              <a href='https://www3.uca.edu/iqzoo/Exhibits/bird_brain.htm'>
                here
              </a>{' '}
              for image source
            </figcaption>
          </figure>
        </Grid>
      </Grid>
      <br />
      <Typography variant='h5' style={{ margin: 20 }}>
        The IQ Zoo was opened in 1955 by Marian and Keller Breland, who also
        worked in Skinner’s lab on Project Pelican. In 1965, Robert ‘Bob’
        Bailey, former Director of Training for the US Navy Marine Program,
        joined IQ Zoo and worked with Marian on the tic-tac-toe playing chickens
        and of the other amazing acts they had. After IQ Zoo, Bob began to share
        his knowledge of animal training conducting ‘chicken camps’ that taught
        learners about types of reinforcers, schedules of reinforcement,
        shaping, chaining, and stimulus control.
      </Typography>
      <br />
      <Grid container justify='center'>
        <Grid item>
          <figure>
            <img src={birdBrain1} alt='birdBrainNoColor' />
            <figcaption>
              A Bird Brain 'house'. Click{' '}
              <a href='https://www3.uca.edu/iqzoo/Exhibits/bird_brain.htm'>
                here
              </a>{' '}
              for image source
            </figcaption>
          </figure>
        </Grid>
      </Grid>
      <br />
      <Typography variant='h5' style={{ margin: 20 }}>
        In college, I joined a student organization, The Organization for
        Reinforcement Contingencies with Animals (ORCA), that hosted a
        conference that he was a speaker at every year. One year, I even got to
        pick him up from the airport. It was a bit nostalgic since he was
        responsible for one of my most cherished memories with my dad. So I
        built this to honor the memory of my father and the legacy of Marian
        Breland Bailey, Keller Breland, and Bob Bailey.
      </Typography>
      <Typography variant='h4' style={{ margin: 20 }}>
        For Interested Readers
      </Typography>
      <a
        style={{ textDecoration: 'none' }}
        href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2755380/'
      >
        <Typography
          variant='h6'
          style={{ margin: 20, color: theme.palette.secondary.main }}
        >
          Operant psychology goes to the fair: Marian and Keller Breland in the
          popular press, 1947-1966
        </Typography>
      </a>
      <a
        style={{ textDecoration: 'none' }}
        href='https://www.smithsonianmag.com/history/the-cias-most-highly-trained-spies-werent-even-human-20149/'
      >
        <Typography
          variant='h6'
          style={{ margin: 20, color: theme.palette.secondary.main }}
        >
          The CIA’s Most Highly-Trained Spies Weren’t Even Human
        </Typography>
      </a>
    </Paper>
  );
};

export default Inspiration;
