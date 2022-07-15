import type { DispatcherType, ISvitchCase, AnyObjectType, CaseFunctionType } from './Svitch.d'

export const Svitch = () => {
  let $dispatcher: DispatcherType = (s: any) => s;
  let $cases: ISvitchCase = {};
  let $default = (..._args: any) => { };

  const factory = (runner: string | AnyObjectType) => {
    const key = typeof $dispatcher === 'string' ? $dispatcher : $dispatcher(runner);

    if (key in $cases) {
      const method = $cases[key];
      return method(runner);
    }

    return $default(runner);
  };

  const dispatchHandler = (dispatcher: DispatcherType) => {
    $dispatcher = dispatcher;
    return factory;
  };

  const caseHandler = (key: string, fn: CaseFunctionType) => {
    $cases[key] = fn;
    return factory;
  };

  const removeCaseHandler = (key: string) => {
    $cases = Object.entries($cases)
      .filter(([k, _fn]) => k !== key)
      .reduce((acc, [k, fn]) => ({ ...acc, [k]: fn }), {});
    return factory;
  };

  const defaultHandler = (defaultFn: () => any) => {
    $default = defaultFn;
    return factory;
  }

  factory['dispatch'] = dispatchHandler;
  factory['case'] = caseHandler;
  factory['remove'] = removeCaseHandler;
  factory['default'] = defaultHandler;

  return factory;
};

export default Svitch;
