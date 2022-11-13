FROM mcr.microsoft.com/devcontainers/javascript-node:18-bullseye

# System tools
RUN true \
	&& apt-get update \
	&& export DEBIAN_FRONTEND=noninteractive \
	&& apt -y install --no-install-recommends \
	git-lfs \
	hunspell \
	parallel \
	&& rm -rf /var/lib/apt/lists/* \
	&& mkdir -p /home/node/.config/Code/Dictionaries/ \
	&& ln -s /usr/share/hunspell/* /home/node/.config/Code/Dictionaries \
	;

# Global node packages
RUN true \
	&& npm install -g --unsafe-perm \
	@slidewave/gitignore-include \
	cross-env \
	dotenv-cli \
	nodemon \
	patch-package \
	pino-pretty \
	rimraf \
	&& npm cache clean --force \
	;

# Quality of life tooling
RUN true \
	&& echo "alias ls='ls --color=auto'" >> /home/node/.bashrc \
	&& echo "alias ll='ls -alF'" >> /home/node/.bashrc \
	&& echo "alias ls='ls --color=auto'" >> /home/node/.zshrc \
	&& echo "alias ll='ls -alF'" >> /home/node/.zshrc \
	&& echo 'PS1="${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ "' >> /home/node/.bashrc \
	&& echo 'PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"' >> /home/node/.bashrc \
	;

WORKDIR /app
