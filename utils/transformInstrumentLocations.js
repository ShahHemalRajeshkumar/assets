export const transformInstrumentLocations = (data, transformOptions) => {
    data.forEach((item) => {
        item.instrument_key = item.instrument_key.replace(transformOptions.oldInstrument, transformOptions.newInstrument);

        item.page_title = item.page_title.replace(transformOptions.oldLesson, transformOptions.newLesson);
        item.location_title = item.location_title.replace(transformOptions.oldLesson, transformOptions.newLesson);
        item.location_url = item.location_url.replace(transformOptions.oldUrl, transformOptions.newUrl);
        item.region_title = item.region_title.replace(transformOptions.oldLesson, transformOptions.newLesson);
    });

    return data;
};
