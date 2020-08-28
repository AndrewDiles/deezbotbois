## Deez Bot Bois

The goal of this project is to create an interface where users can:
- Assemble robots from a collection of frames, power sources, weapons, etc
- Use a UI to script a robot's response to combat based on triggers and knowledge
- Progress through levels against already scripted robots
- Gain drops from said levels based on performance
- Gather in-game currency based on performance and daily log in bonuses
- Use in-game currency to progress through a tree and unlock other features
- Participate in tournament styles PvP with other players

# Note

Players do not actively control robots during battles.
Instead, the robots are all scripted and take one action per battle tick

## GUI

Intentions with the GUI include:
- An expanding screen opening on first load of the page
- Capacity to toggle nav bar between top and left of screen 


## ACTIVE BUGS

- Need to return to Nav bar and correct the size of buttons/their content, based on @media screen query so they fit in the bar while the screen is more narrow




## PAST BUGS

- Main display not scrollable
## Solution: Wrapper required css property: overflow-y: auto;

- if user's avatar image is a bot, then the onHover to reveal the sample profile tab fails to trigger once they hover over the bot (it only triggers when hovering over the background.)
## Solution: I incorrectly used mouseout instead of mouseleave ~.~

- If user swaps between color schemes and tries to update, mongo will throw error
## Solution: verify if new user object is the same as the old using JSON.stringify

## Potential Improvements


- Include a link in the confirmation email that auto fills the confirmationCode

## Reminders

For bot building:
import {plus} from 'react-icons-kit/icomoon/plus'
import {tree} from 'react-icons-kit/icomoon/tree'
import {android} from 'react-icons-kit/icomoon/android'
import {newspaper} from 'react-icons-kit/icomoon/newspaper'
import {calculator} from 'react-icons-kit/icomoon/calculator'

import {listNumbered} from 'react-icons-kit/icomoon/listNumbered'
import {moveUp} from 'react-icons-kit/icomoon/moveUp'
import {moveDown} from 'react-icons-kit/icomoon/moveDown'
import {insertTemplate} from 'react-icons-kit/icomoon/insertTemplate'
import {insertTemplate} from 'react-icons-kit/icomoon/insertTemplate'


import {copy} from 'react-icons-kit/icomoon/copy'

import {floppyDisk} from 'react-icons-kit/icomoon/floppyDisk'

import {shield} from 'react-icons-kit/icomoon/shield'
import {sphere} from 'react-icons-kit/icomoon/sphere'
import {power} from 'react-icons-kit/icomoon/power'
import {bin} from 'react-icons-kit/icomoon/bin'
import {fire} from 'react-icons-kit/icomoon/fire'
import {lab} from 'react-icons-kit/icomoon/lab'
import {wrench} from 'react-icons-kit/icomoon/wrench'
import {target} from 'react-icons-kit/icomoon/target'
import {hammer} from 'react-icons-kit/icomoon/hammer'
import {eye} from 'react-icons-kit/icomoon/eye'
import {arrowRight} from 'react-icons-kit/icomoon/arrowRight'
import {arrowRight} from 'react-icons-kit/icomoon/arrowLeft'
