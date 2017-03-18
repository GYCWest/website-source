#!/bin/bash

xdg-open http://10.0.2.13:5341/ &

hugo server --baseURL 10.0.2.13 --bind 10.0.2.13 --port 5341 --watch
