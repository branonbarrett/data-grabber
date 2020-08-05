FROM alpine:3.11

ARG GDAL_VERSION=v2.2.4

RUN apk -v --update add --no-cache \
  bash \
  postgresql \
  gzip \
  git \
  nodejs \
  gcc \
  python \
  py-pip \
  gdal-dev \
  make \
  # && \
  # make g++ zlib-dev \
  && \
  pip install --upgrade pip \
  && \
  pip install awscli --upgrade
  # && \
  # gdal
  # wget -O gdal.tar.gz "https://github.com/OSGeo/gdal/archive/${GDAL_VERSION}.tar.gz" && \
  # tar --extract --file gdal.tar.gz --strip-components 1 && \
  # cd gdal && \
  # ./configure --prefix=/usr \
  #   --with-libkml \
  #   --without-bsb \
  #   --without-ecw \
  #   --without-fme \
  #   --without-gnm \
  #   --without-grass \
  #   --without-grib \
  #   --without-hdf4 \
  #   --without-hdf5 \
  #   --without-idb \
  #   --without-jasper \
  #   --without-mrf \
  #   --without-mrsid \
  #   --without-netcdf \
  #   --without-pcraster \
  #   --without-webp \
  # && \
  # # gdal python bindings
  # pip install gdal --no-cache-dir

COPY development/db-seed/seed* /
COPY development/db-seed/scripts/* /scripts/
COPY development/db-seed/data/* /data/

COPY package.json /app/
COPY package-lock.json /app/
COPY src /app/src
COPY tsconfig.json /app/

RUN chmod +x /seed-create.sh

CMD ./seed-create.sh