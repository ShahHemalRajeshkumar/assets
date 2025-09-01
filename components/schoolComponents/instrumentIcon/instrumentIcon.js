import Styles from '../../../styles/card-component.module.scss';

export function genrateInstrumentIcon(instrument) {
    return <div className={`${Styles.card_instruments_wrapper} ms_instruments`}>
        <div className={`ms_instruments-${String(instrument).toLowerCase().replace(' ', '_')} ml-2`} />
    </div>
}