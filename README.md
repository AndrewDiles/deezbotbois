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

- ToolTips on attributes can remain with fast mousemovement: going to remove them based on a timer.  This is a bad solution.

- ToolTips on weapons / accessories in inventory bounces window up and down once enough items make scrolling possible.  Going to make up and down arrows to navigate.

- Excess equipment causes flutter in scroll on Tool Tip's mouse over.  Solution will likely involve pagenating number of displayed equipment



## PAST BUGS
- Accessories and weapons that exceed maximum allowed number based on model are not removed during model changes.
# Solution: Manage state variable in reducer by sending it the max allowable values

- Main display not scrollable
# Solution: Wrapper required css property: overflow-y: auto;

- if user's avatar image is a bot, then the onHover to reveal the sample profile tab fails to trigger once they hover over the bot (it only triggers when hovering over the background.)
# Solution: I incorrectly used mouseout instead of mouseleave ~.~

- If user swaps between color schemes and tries to update, mongo will throw error
# Solution: verify if new user object is the same as the old using JSON.stringify

- Log out from profile tab does not refresh current url to home
# Corrected - useEffect required an additional dependency

- NavLinks and StyledButtons are not perfectly aligned.
# Solution: upon correcting their stylings, the profile tab gained an unfortunate "bad looking" layout.  Sub hacky solution was to put all the buttons inside Nav Links.  For buttons that were not supposed to be links, I sent them to where the user already was (which does not occur).

- For non-mouse users, selecting optinos in nav links won't bubble to button's click function.
# Solution: Set navlink's tabindex="-1"

# Potential Improvements

- Change error codes for incorrect passwords to 403, make sure front end does not break with change from 401
- Change error code from 206 to 422 or 400.  (same testing as above)


- Add site navigation using arrows via keyboard listeners and focus direction

- In Assembly: Add drag and drop for equipping

- In Assembly allow staging to display upcoming changes even if only one end of it is done.

- In Assembly: Add ability to click further down line of techs and purchase it and all required techs 

- Change log in to only request confirmation code once an attempt to login for the first time has been made, instead of asking user if they need to input one.

- Refactor fetch functions into re-useable, importable functions.

- Include a link in the confirmation email that auto fills the confirmationCode


## Potential Improvements Met

- In Assembly: Add ability to click and expand each section
# DONE

- In Assembly - Attributes: +/- and % change shouldn't be red for negative cost changes, as this is an improvement
# DONE

- HIGH PRIORITY: improve import method and method of gathering icons for attributes and tech tree.  Current system is clunky
# DONE - Created a function that handles icon imports

- encrypt passwords
# DONE

- Don't ask user if it is their first time logging in.  Instead, let them try, and then ask for the confirmation code.
# DONE

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

import {eye} from 'react-icons-kit/icomoon/eye'
