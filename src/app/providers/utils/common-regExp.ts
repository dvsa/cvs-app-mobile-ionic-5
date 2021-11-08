export class CommonRegExp {
  static UUID_REGEX = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/g;

  static UUID_REGEX_SUB = /^[0-9a-fA-F]{4}$/;

  public static get ODOMETER_VALUE(): RegExp {
    return /\B(?=(\d{3})+(?!\d))/g;
  }

  public static get JTW_TOKEN(): RegExp {
    return /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  }
}
