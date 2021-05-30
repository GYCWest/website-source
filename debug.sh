#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu" ]]; then
	xdg-open http://localhost:5341/ &
elif [[ "$OSTYPE" == "darwin"* ]]; then
	open http://localhost:5341/ &
else # Windows?
	start http://localhost:5341/ &
fi

$(npm bin)/hugo server --baseURL 0.0.0.0 --bind 0.0.0.0 --port 5341 --watch --cleanDestinationDir $@
