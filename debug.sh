#!/bin/bash

xdg-open http://localhost:5341/ &

hugo server --baseURL 0.0.0.0 --bind 0.0.0.0 --port 5341 --watch --cleanDestinationDir $@
