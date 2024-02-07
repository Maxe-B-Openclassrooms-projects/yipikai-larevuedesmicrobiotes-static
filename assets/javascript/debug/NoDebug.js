export default class NoDebug  {
  /**
   * @param a
   */
  static log(a) {
  }

  static startGroup(groupName = null) {
  }

  static debugEnabled() {
    return false;
  }

  static stopGroup() {
  }
}